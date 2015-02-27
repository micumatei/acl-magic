function ExpiringCache(expireTime){
    var storage = {};
    function initilise(space, key){
        if(!storage[space]){
            storage[space] = {};
        }

        if(!storage[space][key]){
            storage[space][key] = {};
        }
    }

    this.insertValue = function(space, key, value){
        initilise(space, key);
        storage[space][key][value] = value;
    }

    this.removeValue = function(space, key, value ){
        initilise(space, key);
        delete storage[space][key][value];
    }


    var err = new Error();
    this.loadAll = function(mapId, key, callback){
        var arr = [];
        if(!storage[space] && !storage[space][key]){
            callback(err, null);
        }

        for(var v in storage[space][key]){
            arr.push(v);
        }
        callback(null, arr);
    }

    function autoClean(){
        storage = {};
        setTimeOut(expireTime,autoClean);
    }

}


exports.createCache = function(expireTime){
    return new ExpiringCache(expireTime);
}