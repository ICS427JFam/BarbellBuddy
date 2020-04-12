import React from 'react';
import axios from 'axios';
import {
  Button,
} from 'semantic-ui-react';
import { element } from 'prop-types';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      users: [],
      // eslint-disable-next-line react/no-unused-state
      benches: [],
      // eslint-disable-next-line react/no-unused-state
      squats: [],
      // eslint-disable-next-line react/no-unused-state
      deadlifts: [],
    };
    this.createUser = this.createUser.bind(this);
    this.updateFirstUser = this.updateFirstUser.bind(this);
    this.updateFirstUserBench = this.updateFirstUserBench.bind(this);
    this.updateFirstUserSquat = this.updateFirstUserSquat.bind(this);
    this.updateFirstUserDeadlift = this.updateFirstUserDeadlift.bind(this);
    this.deleteFirstUserandLifts = this.deleteFirstUserandLifts.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getBenches = this.getBenches.bind(this);
    this.getSquats = this.getSquats.bind(this);
    this.getDeadlifts = this.getDeadlifts.bind(this);
  }

  componentDidMount() {
    this.getUsers();
    this.getBenches();
    this.getSquats();
    this.getDeadlifts();
  }

  async getDeadlifts() {
    const allDeadlifts = await axios
      .get('http://localhost:3001/deadliftList')
      .then((res) => this.setState({ deadlifts: res.data }));
  }

  async getUsers() {
    const allUsers = await axios
      .get('http://localhost:3001/userList')
      .then((res) => this.setState({ users: res.data }));
  }

  async getBenches() {
    const allBenches = await axios
      .get('http://localhost:3001/benchList')
      .then((res) => this.setState({ benches: res.data }));
  }

  async getSquats() {
    const allSquats = await axios
      .get('http://localhost:3001/squatList')
      .then((res) => this.setState({ squats: res.data }));
  }

  async deleteFirstUserandLifts() {
    const userList = await axios
      .get('http://localhost:3001/userList');
    const fuser = userList.data[0];
    axios
      .put('http://localhost:3001/deleteUser', fuser)
      .then(() => console.log('User Deleted'))
      .catch((err) => console.log(err.message));
  }

  async updateFirstUserSquat() {
    const userList = await axios
      .get('http://localhost:3001/userList');
    const fuser = userList.data[0];
    const squatList = await axios
      .get('http://localhost:3001/squatList');
    const fsquat = squatList.data.find((squat) => {
      return squat.uid === fuser.uid;
    });
    fsquat.unit = 'lb';
    fsquat.barType = 'Olympic';
    fsquat.kgInventory = {
      '25kg': 1,
      '20kg': 1,
      '15kg': 0,
      '10kg': 0,
      '5kg': 1,
      '2_1/2kg': 0,
      '2kg': 2,
      '1_1/2kg': 0,
      '1kg': 0,
      '1/2kg': 0,
    };
    fsquat.lbInventory = {
      '45lb': 2,
      '35lb': 0,
      '25lb': 0,
      '10lb': 1,
      '5lb': 1,
      '2_1/2b': 1,
    };
    axios
      .put('http://localhost:3001/updateSquat', fsquat)
      .then(() => console.log('Deadlift updated'))
      .catch((err) => console.log(err.message));
  }

  async updateFirstUserDeadlift() {
    const userList = await axios
      .get('http://localhost:3001/userList');
    const fuser = userList.data[0];
    const deadliftList = await axios
      .get('http://localhost:3001/deadliftList');
    const fdeadlift = deadliftList.data.find((dlift) => {
      return dlift.uid === fuser.uid;
    });
    fdeadlift.unit = 'lb';
    fdeadlift.barType = 'Olympic';
    fdeadlift.kgInventory = {
      '25kg': 1,
      '20kg': 1,
      '15kg': 0,
      '10kg': 0,
      '5kg': 1,
      '2_1/2kg': 0,
      '2kg': 2,
      '1_1/2kg': 0,
      '1kg': 0,
      '1/2kg': 0,
    };
    fdeadlift.lbInventory = {
      '45lb': 2,
      '35lb': 0,
      '25lb': 0,
      '10lb': 1,
      '5lb': 1,
      '2_1/2b': 1,
    };
    axios
      .put('http://localhost:3001/updateDeadlift', fdeadlift)
      .then(() => console.log('Deadlift updated'))
      .catch((err) => console.log(err.message));
  }

  async updateFirstUserBench() {
    const userList = await axios
      .get('http://localhost:3001/userList');
    const fuser = userList.data[0];
    const benchList = await axios
      .get('http://localhost:3001/benchList');
    const fbench = benchList.data.find((bench) => {
      return bench.uid === fuser.uid;
    });
    fbench.unit = 'lb';
    fbench.barType = 'Olympic';
    fbench.kgInventory = {
      '25kg': 1,
      '20kg': 1,
      '15kg': 0,
      '10kg': 0,
      '5kg': 1,
      '2_1/2kg': 0,
      '2kg': 2,
      '1_1/2kg': 0,
      '1kg': 0,
      '1/2kg': 0,
    };
    fbench.lbInventory = {
      '45lb': 1,
      '35lb': 0,
      '25lb': 1,
      '10lb': 0,
      '5lb': 1,
      '2_1/2lb': 1,
    };
    console.log(fbench);
    axios
      .put('http://localhost:3001/updateBench', fbench)
      .then(() => console.log('Bench updated.'))
      .catch((err) => console.log(err.message));
  }

  createUser() {
    const user = {
      'user': {
        username: 'gcalica',
        email: 'gcalica@hawaii.edu',
        password: 'pass',
      },
    };
    axios
      .post('http://localhost:3001/api/users/users', user)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  }

  async updateFirstUser() {
    const userList = await axios
      .get('http://localhost:3001/userList');
    const fuser = userList.data[0];
    fuser.fname = 'Ufname';
    fuser.lname = 'Ulname';
    axios
      .put('http://localhost:3001/updateUser', fuser)
      .then(() => console.log('User created.'))
      .catch((err) => console.log(err.message));
  }

  render() {
    const {
      users, benches, squats, deadlifts,
    } = this.state;
    return (
      <div className="ui container" style={{ marginTop: '4em' }}>
        {/* Test Buttons */}
        <div className="ui grid" style={{ marginBottom: '8em' }}>
          <div className="four wide column">
            <h4>Create User w/lifts</h4>
            <Button type="submit" onClick={this.createUser} className="ui button active">Create User w/lifts</Button>
          </div>
          <div className="four wide column">
            <div>
              <h4>Update User</h4>
              <Button type="button" onClick={this.updateFirstUser} className="ui button active">Update User</Button>
            </div>
            <div>
              <h4>Update Bench</h4>
              <Button onClick={this.updateFirstUserBench} className="ui button active">Update Bench</Button>
            </div>
            <div>
              <h4>Update Squat</h4>
              <Button onClick={this.updateFirstUserSquat} className="ui button active">Update Squat</Button>
            </div>
            <div>
              <h4>Update Deadlifts</h4>
              <Button onClick={this.updateFirstUserDeadlift} className="ui button active">Update Deadlifts</Button>
            </div>
          </div>
          <div className="four wide column">
            <div>
              <h4>Delete User w/lifts</h4>
              <Button onClick={this.deleteFirstUserandLifts} className="ui button active">Delete User w/lifts</Button>
            </div>
          </div>
          <div className="four wide column">
            <div>
              <h4>Get User</h4>
              <Button onClick={this.getUsers} className="ui button active">Get User</Button>
            </div>
            <div>
              <h4>Get Bench</h4>
              <Button onClick={this.getBenches} className="ui button active">Get Bench</Button>
            </div>
            <div>
              <h4>Get Squat</h4>
              <Button onClick={this.getSquats} className="ui button active">Get Squat</Button>
            </div>
            <div>
              <h4>Get Deadlift</h4>
              <Button onClick={this.getDeadlifts} className="ui button active">Get Deadlift</Button>
            </div>
          </div>
        </div>
        {/* Display info */}
        <div className="ui grid">
          <div className="four wide column">
            <h4> User info </h4>
            {
              users.map((user) => {
                const { uid, firstName, lastName } = user;
                return (
                  <div style={{ font: 'black' }}>
                    <p>User ID: {uid}<br/>
                      First Name: {firstName}<br/>
                      Last Name: {lastName}
                    </p>
                    <hr/>
                  </div>
                );
              })
            }
          </div>
          <div className="four wide column">
            <h4> Bench info </h4>
            {
              benches.map((bench) => {
                const { uid, unit, barType } = bench;
                return (
                  <div style={{ font: 'black' }}>
                    <p>User ID: {uid}<br/>
                      unit: {unit}<br/>
                      bar type: {barType}
                    </p>
                    <hr/>
                  </div>
                );
              })
            }
          </div>
          <div className="four wide column">
            <h4> Squat info </h4>
            {
              squats.map((squat) => {
                const { uid, unit, barType } = squat;
                return (
                  <div style={{ font: 'black' }}>
                    <p>User ID: {uid}<br/>
                      unit: {unit}<br/>
                      bar type: {barType}
                    </p>
                    <hr/>
                  </div>
                );
              })
            }
          </div>
          <div className="four wide column">
            <h4> Deadlift info </h4>
            {
              deadlifts.map((deadlift) => {
                const { uid, unit, barType } = deadlift;
                return (
                  <div style={{ font: 'black' }}>
                    <p>User ID: {uid}<br/>
                      unit: {unit}<br/>
                      bar type: {barType}
                    </p>
                    <hr/>
                  </div>
                );
              })
            }
          </div>
          <div/>
        </div>
      </div>
    );
  }
}

export default Test;
