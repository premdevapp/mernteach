const intialIssues = [
  {
    id: 1,
    status: "New",
    owner: "Raven",
    effort: 5,
    created: new Date("2018-08-15"),
    due: undefined,
    title: "Error in console when clicking Add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    effort: 14,
    created: new Date("2018-08-16"),
    due: new Date("2018-08-30"),
    title: "Missing bottom border on panel",
  },
];

const sampleIssue = {
  status: "New",
  owner: "Pietia",
  effort: 14,
  title: "Completion date should be optional",
};
class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.due ? issue.due.toDateString() : ""}</td>
        <td>{issue.title}</td>
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
  constructor() {
    super();
    this.state = { issues: [] };
    setTimeout(() => {
      this.createIssue(sampleIssue);
    }, 2000);
  }

  //componentDidMount, componentDidUpdate, componentWillUnmount, shouldComponentUpdate

  componentDidMount() {
    this.loadData();
  }

  createIssue(issue) {
    issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    const newIssueList = [...this.state.issues];
    newIssueList.push(issue);
    this.setState({ issues: newIssueList });
  }

  loadData() {
    setTimeout(() => {
      this.setState({ issues: intialIssues });
    }, 500);
  }

  render() {
    const IssueRows = this.state.issues.map((issue) => (
      <IssueRow key={issue.id} issue={issue} />
    ));

    return (
      <table className="borderd-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Due Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>{IssueRows}</tbody>
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
