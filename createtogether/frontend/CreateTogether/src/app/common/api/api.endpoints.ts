
export class APIEndPoint {
  constructor(public name: string,
              public endPoint: string,
              public method = 'get',
              public authReq = true,
              public moduleBaseURL?: string
  ) {

  }
}
