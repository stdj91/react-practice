import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'

export class User extends Component {
    componentDidMount() {
     
        this.props.getUser(this.props.match.params.login)
    }
    render() {
        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = this.props.user
        return (
            <Fragment>
                <Link to='/' className="btn btn-light">
                    back to search
            </Link>
                Hireable: 
                {hireable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />}
            </Fragment>
        )
    }
}

export default User
