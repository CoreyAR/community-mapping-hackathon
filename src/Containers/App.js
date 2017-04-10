import React, { Component } from 'react'
import { connect } from 'react-redux'
import FusionActions from '../Redux/FusionRedux'
import FusionServices from '../Services/FusionServices'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton';
import RootMap from './RootMap'
import Slider from 'material-ui/Slider'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import './Styles/App.css'

const style = {
  height: 32,
  width: 32,
  margin: 8,
  textAlign: 'center',
  display: 'inline-block',
};

class App extends Component {

  constructor (props) {
    super(props)
    let fusionServices = new FusionServices(this.props.fusionType)
    let column = `${fusionServices.column(this.props.year)}`
    let from = `${fusionServices.from(this.props.age)}`
    this.state = {
      column: `${column}`,
      from
    }
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.props.year !== nextProps.year || this.props.age !== nextProps.age) {
      let {age, year, fusionType} = nextProps
      let fusionServices = new FusionServices(fusionType)
      this.setState({column: fusionServices.column(year)})
      this.setState({from: fusionServices.from(age)})
    }
  }

  handleYearSlider (event, value) {
    this.props.slideYear(value)
  }

  handleAgeSlider (event, value) {
    this.props.slideAge(value)
  }

  render () {
    return (
      <div className='App'>
        <AppBar
          title='TN Counties by Population Age'
          // iconElementLeft={<FontIcon className="muidocs-icon-custom-github" />}
          iconStyleLeft={{display: 'none'}}
          iconElementRight={<IconButton iconClassName="fa fa-github" color={'white'} href="https://github.com/CoreyAR/community-mapping-hackathon/tree/legal-hack"/>}
          />
        <Toolbar style={{disply: 'flex', justifyContent: 'space-around', flexDirection: 'row'}}>
          <ToolbarGroup style={{flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
            <ToolbarTitle text='Year' />
            <Slider
              min={2010}
              max={2048}
              step={1}
              defaultValue={2010}
              value={this.props.year}
              onChange={this.handleYearSlider.bind(this)}
              style={{flex: 2, alignSelf: 'center'}}
              sliderStyle={{flex: 2, marginBottom: '24px', alignSelf: 'center'}}
              />

            {this.props.year}
          </ToolbarGroup>
          <ToolbarGroup style={{flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
            <ToolbarTitle text='Age' />
            <Slider
              min={5}
              max={85}
              step={5}
              defaultValue={5}
              value={this.props.age}
              onChange={this.handleAgeSlider.bind(this)}
              style={{flex: 1}}
              sliderStyle={{flex: 1, marginBottom: '24px', alignSelf: 'center'}}
              />
            {this.props.age}
          </ToolbarGroup>
          <ToolbarGroup>
            <Chip
              style={{margin: 4, background: 'rgba(30, 136, 229, .1)'}}
            >
              {'< 250'}
            </Chip>            
            <Chip
              style={{margin: 4, background: 'rgba(30, 136, 229, .2)'}}
            >
              {' < 500'}
            </Chip>
            <Chip
              style={{margin: 4, background: 'rgba(30, 136, 229, .3)'}}
            >
              {'< 1000'}
            </Chip>
            <Chip
              style={{margin: 4, background: 'rgba(30, 136, 229, .4)'}}
            >
              {'< 1500'}
            </Chip>
            <Chip
              style={{margin: 4, background: 'rgba(30, 136, 229, .5)'}}
            >
              {'< 2000'}
            </Chip>
            <Chip
              style={{margin: 4, background: 'rgba(30, 136, 229, .6)'}}
            >
              {'< 2050'}
            </Chip>   
            <Chip
              style={{margin: 4, background: 'rgba(30, 136, 229, .7)'}}
            >
              {'< 3000'}
            </Chip>
            <Chip
              style={{margin: 4, background: 'rgba(30, 136, 229, .8)'}}
            >
              {'< 5000'}
            </Chip>
            <Chip
              style={{margin: 4, background: 'rgba(30, 136, 229, .9)'}}
            >
              {'< 7000'}
            </Chip>
            <Chip
              style={{margin: 4, background: 'rgba(30, 136, 229, 1)'}}
            >
              {'> 7000'}
            </Chip>          
          </ToolbarGroup>
        </Toolbar>
        <RootMap
          column={this.state.column}
          from={`${this.state.from}`}
         // from={'1FUVNVv1JbxmZR7OLK5PCJ6ZcDRZWd4oTitAebvzJ'}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    year: state.fusion.year,
    age: state.fusion.age,
    fusionType: state.fusion.fusionType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    slideYear: (year) => dispatch(FusionActions.slideYear(year)),
    slideAge: (age) => dispatch(FusionActions.slideAge(age))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
