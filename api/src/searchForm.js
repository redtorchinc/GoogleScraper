import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import TextField from '@material-ui/core/TextField';

const styles = theme  => ({
    root: {
        width: '100%'
    },
    paperRoot: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    search: {
    },
    searchInputRoot: {
    },
    searchInputInput: {
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    formControl: {
        flexGrow: 1,
        width: '100%'
    }
});

const engines = [
    'google',
    'bing',
    'yahoo',
    'yandex',
    'baidu',
    'duckduckgo'
];

class SearchMethodField extends React.Component {

    render() {
        const { classes, theme, children } = this.props;

        return (
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel>Search Method</FormLabel>
                <RadioGroup
                    style={{ float: 'left', flexDirection: 'row' }}
                    name="method"
                    onChange={this.props.onChangeCb}
                    value={this.props.value}
                >
                    <FormControlLabel value="http" control={<Radio />} label="HTTP" />
                    <FormControlLabel value="selenium" control={<Radio />} label="Selenium" />
                    <FormControlLabel value="http-async" control={<Radio />} label="HTTP-Async" />
                </RadioGroup>
            </FormControl>
        );
    }
}

class SearchResultsPerPageField extends React.Component {

    render() {
        const { classes, theme, children } = this.props;

        return (
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel>Results Per Page</FormLabel>
                <TextField
                    name="results_per_page"
                    onChange={this.props.onChangeCb}
                    value={this.props.value}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 10,
                        min: 10,
                        max: 100,
                    }}
                    margin="normal"
                />
            </FormControl>
        );
    }
}

class SearchNumPagesField extends React.Component {

    render() {
        const { classes, theme, children } = this.props;

        return (
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel>Number of Pages</FormLabel>
                <TextField
                    name="num_pages"
                    onChange={this.props.onChangeCb}
                    value={this.props.value}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1,
                        max: 10,
                    }}
                    margin="normal"
                />
            </FormControl>
        );
    }
}

class SearchNumWorkersField extends React.Component {

    render() {
        const { classes, theme, children } = this.props;

        return (
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel>Number of Workers</FormLabel>
                <TextField
                    name="num_workers"
                    onChange={this.props.onChangeCb}
                    value={this.props.value}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1,
                        max: 10,
                    }}
                    margin="normal"
                />
            </FormControl>
        );
    }
}

class SearchTypeField extends React.Component {
    render() {
        const { classes, theme, children } = this.props;

        return (
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel>Search Type</FormLabel>
                <RadioGroup
                    style={{ float: 'left', flexDirection: 'row' }}
                    name="search_type"
                    onChange={this.props.onChangeCb}
                    value={this.props.value}
                >
                    <FormControlLabel value="web search" control={<Radio />} label="Web Search" />
                    <FormControlLabel value="image search" control={<Radio />} label="Image Search" />
                    <FormControlLabel value="news search" control={<Radio />} label="News Search" />
                    <FormControlLabel value="video search" control={<Radio />} label="Video Search" />
                </RadioGroup>
            </FormControl>
        );
    }
}

// class SearchProxyListField extends React.Component {
//     render() {
//         return (
//
//         );
//     }
// }
//

class SearchDebugLevelField extends React.Component {

    render() {
        const { classes, theme, children } = this.props;

        return (
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel>Search Type</FormLabel>
                <RadioGroup
                    style={{ float: 'left', flexDirection: 'row' }}
                    name="debug_level"
                    onChange={this.props.onChangeCb}
                    value={this.props.value}
                >
                    <FormControlLabel value="none" control={<Radio />} label="None" />
                    <FormControlLabel value="debug" control={<Radio />} label="Debug" />
                    <FormControlLabel value="info" control={<Radio />} label="Info" />
                    <FormControlLabel value="warn" control={<Radio />} label="Warning" />
                    <FormControlLabel value="error" control={<Radio />} label="Error" />
                    <FormControlLabel value="critical" control={<Radio />} label="Critical" />
                </RadioGroup>
            </FormControl>
        );
    }
}

class SearchEnginesField extends React.Component {

    render() {
        const { classes, theme, children } = this.props;

        return (
            <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">Search Engines</InputLabel>
                <Select multiple
                    name="engines"
                    onChange={this.props.onChangeCb}
                    value={this.props.value}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                >
                    {engines.map(name => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={{
                                fontWeight:
                                    this.props.value.indexOf(name) === -1
                                        ? theme.typography.fontWeightRegular
                                        : theme.typography.fontWeightMedium,
                            }}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}


class SearchForm extends React.Component {

    state = {
        search: '',
        engines: ['google', 'bing'],
        method: 'http',
        results: 10,
        pages: 1,
        workers: 1,
        debug: 'info'
    }

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handler = this.handler.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();

        // console.log(event.target);
        console.log(this.state);
    }

    handleChange(event) {
        this.setState({search: event.target.value});
    }

    handler(field, event) {
        let r = [];
        r[field] = event.target.value;
        this.setState(r);

        // console.log(field, event.target.value, this.state);
    }

    render() {
        const { classes, theme, children } = this.props;

        return (
            <form onSubmit={this.handleSubmit} className={classes.root}>
                <Paper className={classes.paperRoot} >
                    <Input
                        placeholder="Search..."
                        name="search"
                        onChange={ ev => { this.handler('search', ev)}}
                        classes={{
                            root: classes.searchInputRoot,
                            input: classes.searcnInputInput
                        }}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" className={classes.searchButton} type="submit">
                        <SendIcon className={classes.rightIcon} />
                    </Button>
                </Paper>
                <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Options</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container
                            direction="column"
                            justify="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item>
                                <SearchEnginesField {... this.props} value={this.state.engines} onChangeCb={ ev => { this.handler('engines', ev)}}/>
                            </Grid>
                            <Grid item>
                                <SearchMethodField {... this.props} value={this.state.method} onChangeCb={ ev => { this.handler('method', ev)}}/>
                            </Grid>
                            <Grid item>
                                <Grid container
                                    direction="row"
                                    justify="center"
                                    alignItems="flex-start"
                                >
                                    <Grid item xs={4}>
                                        <SearchResultsPerPageField {... this.props} value={this.state.results} onChangeCb={ ev => { this.handler('results', ev)}}/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <SearchNumPagesField {... this.props} value={this.state.pages} onChangeCb={ ev => { this.handler('pages', ev)}}/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <SearchNumWorkersField {... this.props} value={this.state.workers} onChangeCb={ ev => { this.handler('workers', ev)}}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/*
                            <Grid item>
                                <SearchTypeField {... this.props value={this.state.type} onChangeCb={ ev => { this.handler('type', ev)}}/>
                            </Grid>
                            */}
                            <Grid item>
                                <SearchDebugLevelField {... this.props} value={this.state.debug} onChangeCb={ ev => { this.handler('debug', ev)}}/>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </form>
        );
    }
}

export default withStyles(styles, { withTheme: true })(SearchForm);
