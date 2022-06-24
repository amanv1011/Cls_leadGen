import './unAuthorized.css'
const UnAuthorizedComponent = () => {
    const loginUrl = {
        local: 'http://localhost:3000/',
        staging: 'https://stagingapp.classicinformatics.net/',
        production: 'https://app.classicinformatics.net/'
    }
    return (
        <div className="redirect-box">
            <h4>Please Login on Portal's Dashboard, And try again</h4>
            <a href={loginUrl.local} className="login-link">Click here to Login</a>
        </div>
    )
}

export default UnAuthorizedComponent