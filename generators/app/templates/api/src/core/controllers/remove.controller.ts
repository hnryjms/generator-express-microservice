import { IRemove, IControllerMethod } from '..';

export const remove = <T>(removeUseCases: IRemove<T>): IControllerMethod => {
  return async (request, response) => {
    try {
      return response.send(await removeUseCases(request.params.id));
    } catch (e) {
      // TODO: Error logging
      console.log(e)
      return response.status(500).send(e.message);
    }
  }
}
