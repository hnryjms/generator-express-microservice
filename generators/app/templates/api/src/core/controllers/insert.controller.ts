import { IInsert, IControllerMethod } from '..';

export const insert = <T>(insertUseCases: IInsert<T>): IControllerMethod => {
  return async (request, response) => {
    try {
      return response.send(await insertUseCases(request.body));
    } catch (e) {
      // TODO: Error logging
      console.log(e)
      return response.status(500).send(e.message);
    }
  }
}
