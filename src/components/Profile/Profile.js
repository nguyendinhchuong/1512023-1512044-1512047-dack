import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
export default class Topbar extends React.Component {
    render() {
        return (
            <div className="col-sm-6">
                <div className="myProfile" >
                    <form>

                        <FormGroup  bsSize="large">
                            <ControlLabel>
                                Họ và tên
                            </ControlLabel>
                            <FormControl/>
                        </FormGroup>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>
                                Email
                            </ControlLabel>
                            <FormControl/>
                        </FormGroup>
                        
                        <Button block bsSize="large" type="submit">
                            Save
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}



