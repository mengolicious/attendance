import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import MemberList from './member/member-list'
import MemberCardSmall from './member/member-card-small'
import MemberCard from './member/member-card'
import MemberCardLoading from './member/member-card-loading'
import Search from './member/member-search'
import { Menu } from 'semantic-ui-react'

class MemberMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      membersIn: [],
      membersOut: [],
      searchQuery: ''
    }
  }

  componentWillReceiveProps({ membersIn, membersOut }) {
    this.setState({ membersOut, membersIn })
  }

  onCardClick = (id) => {
    this.props.history.push(`/${id}`)
  }

  onSearchInput = (q) => {
    this.setState({
      membersOut: this.props.membersOut.filter(member => (
        RegExp('' + q.target.value, 'ig')
          .test(`${member.firstname} ${member.surname}`)
      ))
    })
  }

  render() {
    return (
      <Fragment>
        <div style={{ paddingBottom: '20vh' }}>
          <MemberList
            title={'Check In:'}
            members={this.state.membersOut}
            Component={MemberCard}
            onCardClick={this.onCardClick}
            loading={this.props.loading}
            Loader={MemberCardLoading}
          >
            <Menu>
              <Menu.Item as={Link} to='/add'>
                New Volunteer
            </Menu.Item>
              <Menu.Item position='right'>
                <Search
                  onSearchInput={this.onSearchInput}
                />
              </Menu.Item>
            </Menu>
          </MemberList>
        </div>
        <MemberList
          style={{
            position: 'fixed',
            zIndex: '999',
            backgroundColor: 'white',
            bottom: '0',
            left: '0',
            right: '0',
            height: '20vh',
            padding: '0 20px 10px',
            textAlign: 'center',
          }}
          title={'Who\'s Here:'}
          members={this.state.membersIn}
          Component={MemberCardSmall}
          onCardClick={this.onCardClick}
          loading={this.props.loading}
          Loader={MemberCardLoading}
        />
      </Fragment>
    )
  }
}


export default withRouter(MemberMain)
