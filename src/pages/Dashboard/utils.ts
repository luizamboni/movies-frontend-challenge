function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  
export async function retry(func: () => Promise<any>, limit: number): Promise<any> {
  let attempts = 0;
  while (attempts < limit) {
    try {
      return await func();
    } catch (err) {
      console.error(`Attempt ${attempts + 1} failed:`, err);
      attempts++;
      if (attempts < limit) {
        const delay = attempts * 1000;
        console.error(`Retrying in ${delay}ms...`);
        await sleep(delay);
      } else {
        console.error("No more attempts left.");
        throw err;
      }
    }
  }
}