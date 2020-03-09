import { IUpdate, IControllerMethod } from '..';

export const update = <T>(updateUseCases: IUpdate<T>): IControllerMethod => {
  return async (request, response) => {
    try {
      return response.send(await updateUseCases(request.params.id, request.body));
    } catch (e) {
      // TODO: Error logging
      console.log(e)
      return response.status(500).send(e.message);
    }
  }
}
