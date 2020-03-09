import { IFilter,IControllerMethod } from '..';

export const filter = <T>(filterUseCases: IFilter<T>):IControllerMethod => {
  return async (request, response) => {
    try {
      console.log('caling filter...');
      return response.send(await filterUseCases(request.query));
    } catch (e) {
      // TODO: Error logging
      console.log(e)
      return response.status(500).send(e.message);
    }
  }
}
