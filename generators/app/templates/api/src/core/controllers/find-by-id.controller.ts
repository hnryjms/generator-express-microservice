import { IFindById,IControllerMethod } from '..';

export const findbyId = <T>(findByIdUseCase: IFindById<T>):IControllerMethod => {
  return async (request, response) => {
    try {
      console.log('caling findbyId...');
      return response.send(await findByIdUseCase(request.params.id));
    } catch (e) {
      // TODO: Error logging
      console.log(e)
      return response.status(500).send(e.message);
    }
  }
}
