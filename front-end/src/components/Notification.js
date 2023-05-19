import Alert from 'react-bootstrap/Alert';
const Notification = ({variant, header, msg}) => {
    if(msg && msg.length) {
        return (
            <Alert variant={variant} style={{padding:'0px', marginTop:'65px'}}>
                <Alert.Heading>{header}</Alert.Heading>
                <p>
                    {msg}
                </p>
            </Alert>
        );
    } else {
        return (<></>)
    }
}
export default Notification;