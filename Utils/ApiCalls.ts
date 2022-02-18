export default class ApiCalls {
    public static fetchUrl = async (url: string) => {
      return await fetch(url).then(r => r.json())
    }
}