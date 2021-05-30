/*import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import InfoCard from '../components/infocard.jsx';
import '../stylesheets/allinfo.css';
import { propTypes } from 'react-bootstrap/esm/Image';*/


//import 'bootstrap/dist/css/bootstrap.min.css';


/*const ViewSchool = (props) => {
    const currInfo = props.location.param1

    console.log(currInfo)

    const [name, setName] = useState("")
    const [about, setAbout] = useState("")
    const [location, setLocation] = useState("");
    const [admission, setAdmission] = useState("");
    const [school, setSchool] = useState("")
    const id = currInfo.id
    //setID(currInfo.id)

    console.log('hello')

    useEffect((e) => {
        async function getInfo() {
            await axios.get(`http://localhost:4000/api/moreinfo/${id}`).then(res => setSchool(res.data[0]))
        }
        getInfo()
    }, [])

    console.log('school', school)

    return (
        <div>
            <Link to="/">
                <button className="ret_btn">Return</button>
            </Link>
            <div class="header">
                <h2>Header</h2>
            </div>

            <div class="row">
                <div class="column middle" style="background-color:#bbb;">Column</div>
                <div class="column side" style="background-color:#ccc;">Column</div>
            </div>

            <div class="footer">
                <p>Footer</p>
            </div>


        </div>

    )
    
}*/


import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import { propTypes } from 'react-bootstrap/esm/Image';
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component, useState, useEffect } from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'

const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    },
})

const HomepageHeading = ({ mobile, props }) => (
    <Container text>
        <Header
            as='h2'
            content="Dreamschools"
            inverted
            style={{
                fontSize: mobile ? '2em' : '2em',
                fontWeight: 'normal',
                marginBottom: 'auto',
                marginTop: 'auto',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingTop: '1rem',
                //paddingBottom: '3rem'
            }}
        />
    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}


class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { children } = this.props
        const { fixed } = this.state

        return (
            <Media greaterThan='mobile'>

                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 50, maxHeight: 100, padding: '1em 0em' }}
                        vertical

                    >
                        <div style={{ display: "flex" }}>
                            <HomepageHeading title={this.props.title} />
                            <Link to="/" style={{ paddingRight: "8rem", paddingBottom: "2rem" }}>
                                <button className="ret_btn" >Return</button>
                            </Link>
                        </div>


                    </Segment>
                </Visibility>

                { children}
            </Media >
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}



const ResponsiveContainer = ({ children }) => (
    /* Heads up!
     * For large applications it may not be best option to put all page into these containers at
     * they will be rendered twice for SSR.
     */
    <MediaContextProvider>
        <DesktopContainer>{children}</DesktopContainer>
    </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

const ViewSchool = (props) => {

    const currInfo = props.location.param1

    console.log(currInfo)

    const [name, setName] = useState("")
    const [about, setAbout] = useState("")
    const [location, setLocation] = useState("");
    const [admission, setAdmission] = useState("");
    const [school, setSchool] = useState("")
    const id = currInfo.id
    //setID(currInfo.id)

    console.log('hello')

    useEffect((e) => {
        async function getInfo() {
            await axios.get(`http://localhost:4000/api/moreinfo/${id}`).then(res => setSchool(res.data[0]))
        }
        getInfo()
    }, [])

    console.log('school', school)

    return (
        <ResponsiveContainer title={props.name}>

            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={8} style={{ paddingLeft: '4rem' }}>

                            <Header as='h3' style={{ fontSize: '2em' }}>
                                About {school.name}
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                {school.about}
                            </p>
                        </Grid.Column>
                        <Grid.Column floated='right' width={6}>
                            <Image bordered rounded size='large' src='/images/wireframe/white-image.png' />
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </Segment>

            <Segment style={{ padding: '0em' }} vertical>
                <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row textAlign='center'>


                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{ padding: '8em 0em' }} vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        Location
        </Header>
                    <p style={{ fontSize: '1.33em' }}>
                        {school.location}
                    </p>


                    <Divider
                        as='h4'
                        className='header'
                        horizontal
                        style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                    >
                        <p>Name</p>
                    </Divider>

                    <Header as='h3' style={{ fontSize: '2em' }}>
                        Admission
        </Header>
                    <p style={{ fontSize: '1.33em' }}>
                        {school.admission}
                    </p>


                </Container>
            </Segment>


        </ResponsiveContainer>
    )
}

//export default HomepageLayout


export default ViewSchool;