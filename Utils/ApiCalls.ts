export default class ApiCalls {
    public static fetchUrl = async (url: string) => {
      return fetch(url).then(r => r.json())
    }
}