import React, { useEffect } from "react";
import FormControl from "pages/Editor/FormControl";
import Text, { TextType, Case } from "components/ads/Text";
import Icon, { IconSize } from "components/ads/Icon";
import { Classes } from "components/ads/common";
import styled from "styled-components";
import { FieldArray } from "redux-form";
import FormLabel from "components/editorComponents/FormLabel";
import { ControlProps } from "./BaseControl";

const CenteredIcon = styled(Icon)`
  margin-top: 25px;
`;

const PrimaryBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${(props) => props.theme.colors.apiPane.dividerBg};
  padding: 10px;
  border-radius: 5px;
`;

const SecondaryBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
`;

const AddMoreAction = styled.div`
  width: fit-content;
  cursor: pointer;
  display: flex;
  margin-top: 16px;
  margin-left: 12px;
  .${Classes.TEXT} {
    margin-left: 8px;
    color: #858282;
  }
  svg path {
    stroke: ${(props) => props.theme.colors.apiPane.bg};
  }
`;

function NestedComponents(props: any) {
  useEffect(() => {
    if (props.fields.length < 1) {
      props.fields.push({ key: "", operand: "", value: "" });
    }
  }, [props.fields.length]);
  return (
    props.fields &&
    props.fields.length > 0 && (
      <PrimaryBox>
        {props.fields.map((field: string, index: number) => {
          return (
            <SecondaryBox key={index}>
              {props.schema.map((sch: any, idx: number) => {
                sch = {
                  ...sch,
                  configProperty: `${field}.${sch.key}`,
                };
                return (
                  <FormControl
                    config={sch}
                    formName={props.formName}
                    key={idx}
                  />
                );
              })}
              {index > 0 && (
                <CenteredIcon
                  name="delete"
                  onClick={() => props.fields.remove(index)}
                  size={IconSize.XXL}
                />
              )}
            </SecondaryBox>
          );
        })}
        <AddMoreAction
          onClick={() => props.fields.push({ key: "", value: "", operand: "" })}
        >
          <Icon
            className="t--addApiHeader"
            name="add-more"
            size={IconSize.LARGE}
          />
          <Text case={Case.UPPERCASE} type={TextType.H5}>
            Add more
          </Text>
        </AddMoreAction>
      </PrimaryBox>
    )
  );
}

export default function FieldArrayControl(props: FieldArrayControlProps) {
  const { configProperty, formName, label, schema } = props;
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <FieldArray
        component={NestedComponents}
        name={configProperty}
        props={{ formName, schema }}
        rerenderOnEveryChange={false}
      />
    </>
  );
}

export type FieldArrayControlProps = ControlProps;
