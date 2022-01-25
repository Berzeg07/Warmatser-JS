import {
    hideModal
} from '../modules/modal';
import {
    heroUpdate
} from '../modules/hero';
import {
    showInvOnMain
} from '../modules/hero';
import {
    handlerJournal
} from '../modules/journal';

handlerJournal();

hideModal();
heroUpdate();
showInvOnMain();
// Подключение локаций *
import '../loc/start';
import '../loc/store';
import '../loc/farmeguard';
import '../loc/farm';
import '../loc/foggyhollow';
import '../loc/forest';
import '../loc/forge';
import '../loc/herohouse';
import '../loc/mageshouse';
import '../loc/fridrick';
import '../loc/tavern';
import '../loc/trainer';
import '../loc/georg';
import '../loc/guard';
import '../loc/bernard';
