import React from 'react';
import axios from 'axios';
import TeamMember from '../TeamMember';
import './App.css';
import CodelitEmptyAvatar from '../../assets/codelit_empty_avatar.svg';
import { NewMemberForm } from '../TeamMember/TeamMember';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: [],
      loading: true,
      formVisibility:false,
      formData:{
        firstName:null,
        lastName:null,
        title:null,
        story:null,
        color:"#000",
        photo:CodelitEmptyAvatar,
      }
    };
  }

  async componentDidMount() {
    try {
      await this.fetchInitialData();
    } catch (error) {
      // try again after half a second if fails due to race condition
      console.log('retrying initial data request...');
      setTimeout(async () => {
        await this.fetchInitialData();
      }, 500);
    }
  }

  async fetchInitialData() {
    const response = await axios.get('/team');
    this.setState({
      team: response.data,
      loading: false
    });
  }

  
  addNewTeamMember=async (data)=> {
    // validation
    if((data.firstName,data.lastName,data.title,data.story==null)||(data.firstName,data.lastName,data.title,data.story=="")) {
      alert("Invalid submission")
      return
    }
    const response=await axios.post('/team',data);
    this.setState({
      team:response.data,
      formVisibility:false,
      loading:false
    })
  }

  handleForm=()=>{
    this.setState({
      formVisibility:!(this.state.formVisibility)
    })
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="app">
        <div className="team-grid" />
        {this.state.team.map(member => (
          <TeamMember
            key={member.id}
            name={`${member.firstName} ${member.lastName}`}
            title={member.title}
            photoUrl={member.photoUrl}
            story={member.story}
            favoriteColor={member.favoriteColor}
          />
        ))}
        {/* Make this new team member link to your form! */}
        <TeamMember id="new" name="" title="New Teammate" isNewCard={true} handleForm={this.handleForm}></TeamMember>
        {this.state.formVisibility&&<div className='form-area'><NewMemberForm handleCancel={this.handleForm} handleSubmit={this.addNewTeamMember}/></div>}
      </div>
    );
  }
}

export default App;