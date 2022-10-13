import {Router} from 'express'
import { create_item, get_item_list, get_item, update_item, delete_item} from '../controllers/appCtrl';

const appRouter = Router();

appRouter.route('/items').get(get_item_list)
                        .post(create_item);
appRouter.route('/items/:id').get(get_item)
                        .put(update_item)
                        .delete(delete_item);

export default appRouter;