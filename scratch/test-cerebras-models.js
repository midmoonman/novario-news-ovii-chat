async function test() {
  try {
    const res = await fetch('https://api.cerebras.ai/public/v1/models');
    if (res.ok) {
      const data = await res.json();
      console.log("Cerebras Public Models:", JSON.stringify(data, null, 2));
    } else {
      console.error("Failed to fetch. Status:", res.status);
    }
  } catch (e) {
    console.error("Exception:", e);
  }
}

test();
