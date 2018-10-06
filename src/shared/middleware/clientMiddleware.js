export default function clientMiddleware(client){
  return ({dispatch, getState}) => {
    return (next) => (action) => {
      if (typeof action === 'function'){
        return action(dispatch, getState);
      }

      const {promise, types, ...rest} = action;

      if(!promise){
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type:REQUEST});

      const actionPromise = promise(client);

      actionPromise.then(
        (payload) => {
          next({...rest, type: SUCCESS, payload});
        },
        (error) => {
          next({...rest, type: FAILURE, error: true, payload: error});
        }
      );

      return actionPromise;
    }
  }
}
