import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/cardstyles.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';



const InfoCard = (props) => {
    const url = `https://dreamschools-bucket.s3.amazonaws.com/${props.url}`
    console.log(url)
    return (
        <div className="container spacer">
            <div className=" row align-items-center gen-card">
                <div className="col-12 col-md-6"><img width="100%" alt="image_here" src={url} sizes="(max-width: 200x) 80vw, 200px" /></div>

                <div className="col-12 col-md-6 gen-card">
                    <h3>{props.name}</h3>
                    <p>{props.about}</p>


                    <Link to={{
                        pathname: `/allinfo/${props.identifier}`,
                        param1: {
                            name: props.name,
                            about: props.about,
                            location: props.location,
                            admission: props.admission,
                            id: props.identifier
                        }
                    }}>
                        <button className="btn btn-primary my-3 btn-block">More information</button>
                    </Link>

                    <Link to={{
                        pathname: `/edititem/${props.identifier}`,
                        param1: {
                            name: props.name,
                            about: props.about,
                            location: props.location,
                            admission: props.admission,
                            id: props.identifier
                        }
                    }}>
                        <button className="btn btn-primary my-3 btn-block">Edit</button>
                    </Link>

                </div>
            </div>
        </div>
    )
}


export default InfoCard