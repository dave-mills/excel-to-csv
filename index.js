const {excel2csv} = require('./excel2csv');
const core = require('@actions/core');
const {join} = require('path');

const workspace = process.env.GITHUB_WORKSPACE;
const excelPath = join(workspace, core.getInput('excel_path'));


try {
    excel2csv(excelPath);
} catch(err) {
    core.setFailed(err.message);
}

