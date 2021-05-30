import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import InfoCard from '../components/infocard.jsx';
import Img from '../components/renderimg.jsx';

import '../stylesheets/cardstyles.css';
import '../stylesheets/styleimg.css';

import { propTypes } from 'react-bootstrap/esm/Image';


//import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const [schools, setSchools] = useState([], []);
    const [imageKey, setImageKey] = useState([]);




    useEffect(() => {
        async function requestSchools() {
            await axios.get("http://localhost:4000/api/getschool").then(response => {
                console.log(response.data)
                setSchools(response.data.rows)
            })

            await axios.get("http://localhost:4000/api/getschoolimages").then(response => {
                console.log(response.data)
                setImageKey(response.data.Contents)
            })
        }
        requestSchools();

        let doubleArr = [[], []]
        doubleArr[0].push(schools)
        doubleArr[1].push(imageKey)

        console.log('doubleArr', doubleArr)

        setSchools(doubleArr);

        return schools
    }, []);

    console.log('schools Correct', schools)


    //console.log(schools)


    const renderSchools = (school, index) => {
        return (
            <div>
                <InfoCard
                    key={index}
                    id={index}
                    name={school.name}
                    about={school.about}
                    location={school.location}
                    admission={school.admission}
                    identifier={index + 1}
                    url={imageKey[index]}

                />
            </div>

        )
    }

    return (
        <div>
            <Link to="/additem">
                <button className="ret_btn">Create</button>
            </Link>
            <div>{schools.map(renderSchools)}</div>
        </div>

    )
}

export default HomePage;