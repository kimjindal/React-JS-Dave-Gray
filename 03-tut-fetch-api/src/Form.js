import Button from './Button';

const Form = ({ reqType, setReqType }) => {
    return (
        <form onSubmit={(e) => e.preventDefault}>
            <Button
                reqType={reqType}
                setReqType={setReqType}
                buttonText="users"
            />
            <Button
                reqType={reqType}
                setReqType={setReqType}
                buttonText="posts"
            />
            <Button
                reqType={reqType}
                setReqType={setReqType}
                buttonText="comments"
            />
        </form>
    );
};

export default Form;
