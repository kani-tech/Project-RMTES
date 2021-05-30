import React, { useState, useLocation } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios'
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/addForm.css';

const EditSchool = (props) => {
    const currInfo = props.location.param1
    console.log(props.location.param1)
    const [name, setName] = useState(currInfo.name);
    const [about, setAbout] = useState(currInfo.about);
    const [location, setLocation] = useState(currInfo.location);
    const [admission, setAdmission] = useState(currInfo.admission);
    const [image, setImage] = useState(null);
    const [flipper, setFlipper] = useState(false);
    const id = currInfo.id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: name,
            about: about,
            location: location,
            admission: admission,
        }

        const response = await axios({
            url: `http://localhost:4000/api/editschool/${id}`,
            method: 'put',
            data: payload
        })

        if (response.status === 200) {
            setFlipper(true)
        }
    }

    if (flipper) {
        return <Redirect to="/"></Redirect>;
    }
    return (
        <div>
            <Link to="/">
                <button className="ret_btn">Return</button>
            </Link>
            <div className="fix_head">
                <h1>Feel free to edit your information</h1>

            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-input">
                    <p className="img_txt">Image(gif, jpeg, jpg, png)</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setImage(e.target.files[0])}
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                    />
                    <textarea
                        type="text"
                        name="about"
                        placeholder="About"
                        value={about}
                        cols="30"
                        rows="10"
                        onChange={e => setAbout(e.target.value)}>

                    </textarea>
                    <textarea
                        type="text"
                        name="location"
                        value={location}
                        cols="30"
                        rows="10"
                        placeholder="Location"
                        onChange={e => setLocation(e.target.value)}>

                    </textarea>

                    <textarea
                        type="text"
                        name="admission"
                        value={admission}
                        cols="30"
                        rows="10"
                        placeholder="Admission"
                        onChange={e => setAdmission(e.target.value)}>

                    </textarea>
                    <button className="sub_btn" type="submit">Submit</button>
                </div>
            </form>

        </div>

    )
}

export default EditSchool