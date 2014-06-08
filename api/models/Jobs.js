/**
 * Jobs
 *
 * @module      :: Model
 * @description :: An entry describing a job held and linking to projects associated with this job.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
    employer: 'string',
    startDate: 'date',
    endDate: 'date',
    title: 'string',
    description: 'string',
    projects: 'array'
  }
};
