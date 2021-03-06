import { providerWrapper, IApplicationContext } from 'midway-mirror';
import * as Sequelize from 'sequelize';
import { CoreDBDataSource } from '../../dataSource/core';

export async function factory(context: IApplicationContext) {
  const name = 'alarmRules';
  const dataSource = await context.getAsync<CoreDBDataSource>('coreDB');
  const instance = dataSource.getInstance();

  /* tslint:disable:variable-name */
  const AlarmRuleModel = instance.define(name, {
    scope: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    scopeName: {
      type: Sequelize.STRING(256),
      allowNull: false,
      field: 'scope_name',
    },
    ruleName: {
      type: Sequelize.STRING(256),
      allowNull: false,
      field: 'rule_name',
    },
    ruleType: {
      type: Sequelize.INTEGER(4).UNSIGNED,
      allowNull: true,
      defaultValue: 1,
      field: 'rule_type',
    },
    follower: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    creator: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    executeRule: {
      type: Sequelize.TEXT,
      allowNull: false,
      field: 'execute_rule',
    },
    disabled: {
      type: Sequelize.INTEGER(4).UNSIGNED,
      allowNull: true,
      defaultValue: 0,
    },
    deleted: {
      type: Sequelize.INTEGER(4).UNSIGNED,
      allowNull: true,
      defaultValue: 0,
    },
    action: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    actionParams: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'action_params',
    },
  }, {
    timestamps: true,
    createdAt: 'gmt_create',
    updatedAt: 'gmt_modified',
    freezeTableName: true,
    tableName: 'sandbox_alarm_rules',
  });

  return AlarmRuleModel;
}

providerWrapper([
  {
    id: 'alarmRuleModel',
    provider: factory,
  },
]);
