// get path for routing, needed for hosting project in subfolder on GitHub pages
export const PATH = process.env.NODE_ENV === 'production' ? '/git-api-client' : '/';

export const HOME_ROUTE = PATH.length > 1 ? PATH : '';
