

const url = 'http://localhost:8000';


export const Global = {

    url_back : url + '/api',



    remove_token : function():void {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        window.location.reload();
    }

}



