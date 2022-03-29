const apiRequest = async (url = '', optionObj = null, errMsg = null) => {
    try {
        const respone = await fetch(url, optionObj);
        if (!respone.ok) throw Error('please reload the app.');
    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
};

export default apiRequest;
