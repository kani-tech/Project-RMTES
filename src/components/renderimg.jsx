import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/cardstyles.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';



const Img = (props) => {
    const url = `https://dreamschools-bucket.s3.amazonaws.com/${props.url}`
    console.log(url)
    return (
        <div className="container spacer">
            <div className=" align-items-center img-part">
                <div className="col-12 col-md-6"><img width="100%" alt="Grandfather with child" src={url} sizes="(max-width: 200x) 80vw, 200px" /></div>

            </div>
        </div>
    )
}

export default Img