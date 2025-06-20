export const spider = async (apiKey, url) => {
    const f = await fetch(`http://localhost:8080/JSON/spider/action/scan/?apikey=${encodeURIComponent(apiKey)}&url=${encodeURIComponent(url)}&maxChildren=&recurse=&contextName=&subtreeOnly=`);
    const { scan } = await f.json();

    const cycle = async (resolve, reject) => {
        const f = await fetch(`http://localhost:8080/JSON/spider/view/status/?apikey=${encodeURIComponent(apiKey)}&scanId=${scan}`);
        const { status } = await f.json();
        if(status !== "100") setTimeout(cycle, 300, resolve, reject);
        else resolve();
    };
    await new Promise(cycle);

    const fResults = await fetch(`http://localhost:8080/JSON/spider/view/results/?apikey=${encodeURIComponent(apiKey)}&scanId=${scan}`);
    const { results } = await fResults.json();
    return results;
};
export const activeScan = async (apiKey, url) => {
    const f = await fetch(`http://localhost:8080/JSON/ascan/action/scan/?apikey=${encodeURIComponent(apiKey)}&url=${encodeURIComponent(url)}&recurse=&inScopeOnly=&scanPolicyName=&method=&postData=&contextId=`);
    const { scan } = await f.json();

    const cycle = async (resolve, reject) => {
        const f = await fetch(`http://localhost:8080/JSON/ascan/view/status/?apikey=${encodeURIComponent(apiKey)}&scanId=${scan}`);
        const { status } = await f.json();
        if(status !== "100") setTimeout(cycle, 300, resolve, reject);
        else resolve();
    };
    await new Promise(cycle);

    const fResults = await fetch(`http://localhost:8080/JSON/ascan/view/alertsIds/?apikey=${encodeURIComponent(apiKey)}&scanId=${scan}`);
    const { alertsIds } = await fResults.json();
    const alerts = await Promise.all(alertsIds.map(async x => await (await fetch(`http://localhost:8080/JSON/alert/view/alert/?apikey=${apiKey}&id=${x}`)).json()));
    return alerts;
};