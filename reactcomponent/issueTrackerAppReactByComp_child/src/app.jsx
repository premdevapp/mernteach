/* class BorderWrap extends React.Component {
  render() {
    const borderStyle = {border: "1px solid silver", padding: 6}
    return(
      <div style={borderStyle}>{this.props.children}</div>)
  }
}

<BorderWrap>
  <ExampleComponent />
</BorderWrap> */

class IssueRow extends React.Component {
  render() {
    const style = { border: "1px solid silver", padding: 4 };
    return (
      <tr>
        <td style={style}>{this.props.issue_id}</td>
        <td style={style}>{this.props.children}</td>
      </tr>
    );
  }
}

class IssueFilter extends React.Component {
  render() {
    return <div>This is placeholder for issue tracker</div>;
  }
}
class IssueTabel extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <IssueRow issue_id={1}>Error in Console</IssueRow>
          <IssueRow issue_id={2}>Error in Browser</IssueRow>
        </tbody>
      </table>
    );
  }
}
class IssueAdd extends React.Component {
  render() {
    return <div>This is placeholder for form to add an issue</div>;
  }
}
class IssueList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTabel />
        <hr />
        <IssueAdd />
      </React.Fragment>
    );
  }
}

const element = <IssueList />;
ReactDOM.render(element, document.querySelector(".contents"));
