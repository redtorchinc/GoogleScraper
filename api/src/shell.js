import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import themeShell from './theme';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import SearchForm from './searchForm';

const styles = theme  => ({
    root: {
        flexGrow: 1
    },
    appbar: {
    },
});


class Shell extends React.Component {

    render() {
        const { classes, theme, children } = this.props;

        return (
            <div className={classes.root}>
                <AppBar
                    position="static"
                    className={classes.appBar}
                    color="primary"
                >
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Hello
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                    spacing={theme.spacing.unit}
                >
                    <Grid item>
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <Grid item xs={10}>
                                <SearchForm />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <React.Fragment>{children}</React.Fragment>
            </div>
        );
    }
}

export default themeShell(withStyles(styles, { withTheme: true })(Shell));
