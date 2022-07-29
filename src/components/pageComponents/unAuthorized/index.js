import './unAuthorized.css'
const UnAuthorizedComponent = () => {
    const {
        REACT_APP_REDIRECT_LINK
    } = process.env

    return (
        <div className="redirect-box">
            <h4>Please Login on Portal's Dashboard, And try again</h4>
            <a href={REACT_APP_REDIRECT_LINK} className="login-link">Click here to Login</a>
        </div>
    )
}

export default UnAuthorizedComponent