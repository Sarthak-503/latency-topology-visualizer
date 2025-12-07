import { LatencyLink, GeoNode } from '@/types';

function getDistanceLatency(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; 
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; 
  
  const baseLatency = (d * 2) / 200; 
  return Math.max(5, baseLatency + 10); 
}

function deg2rad(deg: number) {
  return deg * (Math.PI/ 180);
}

const HISTORY_BUFFER_SIZE = 100;

export const generateInitialLinks = (nodes: GeoNode[]): LatencyLink[] => {
  const links: LatencyLink[] = [];

  // Iterate through each unique pair of nodes
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const nodeA = nodes[i];
      const nodeB = nodes[j];

      // Compute the base latency using geographical distance
      const baseLatency = getDistanceLatency(nodeA.lat, nodeA.lng, nodeB.lat, nodeB.lng);

      // Decide whether to create a link
      const connectNodes =
        baseLatency < 250 ||
        (nodeA.type === "Exchange" && nodeB.type === "Cloud Region");

      if (!connectNodes) continue;

      // Generate initial latency history (60 entries, 2s apart)
      const latencyHistory = Array.from({ length: 60 }, (_, index) => ({
        timestamp: Date.now() - (60 - index) * 2000,
        value: baseLatency + (Math.random() * 10 - 5), // add small random fluctuation
      }));

      // Add the link to the result array
      links.push({
        id: `${nodeA.id}-${nodeB.id}`,
        source: nodeA.id,
        target: nodeB.id,
        latencyMs: baseLatency,
        status: "optimal",
        history: latencyHistory,
      });
    }
  }

  return links;
};


export const updateLatencies = (links: LatencyLink[]): LatencyLink[] => {
  return links.map(link => {
    const jitter = (Math.random() - 0.5) * 10; 
    let newLatency = Math.max(5, link.history[link.history.length - 1].value + jitter);
    
    if (Math.random() > 0.98) {
      newLatency += 50 + Math.random() * 100;
    }

    const baseline = link.history[0].value; 
    if (newLatency > baseline * 2) {
      newLatency = newLatency * 0.9;
    }

    let status: LatencyLink['status'] = 'optimal';
    if (newLatency > 120) status = 'moderate';
    if (newLatency > 250) status = 'critical';

    const newHistory = [
      ...link.history,
      { timestamp: Date.now(), value: newLatency }
    ].slice(-HISTORY_BUFFER_SIZE); 

    return {
      ...link,
      latencyMs: newLatency,
      status,
      history: newHistory
    };
  });
};