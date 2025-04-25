export class HTTPError extends Error {
  status: number
  statusText: string

  constructor(response: Response) {
    super("HTTP request failed")
    this.name = "HTTPError"
    this.status = response.status
    this.statusText = response.statusText
  }
}
