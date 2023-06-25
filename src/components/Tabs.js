import { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';

export default function Tabs({titles, contents}) {
  const [fillActive, setFillActive] = useState('tab1');

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  return (
    <>
      <MDBTabs fill className='mb-3'>
        {titles.map((title, index) => {
            return (
                <MDBTabsItem key={index}>
                    <MDBTabsLink onClick={() => handleFillClick(`tab${index + 1}`)} active={fillActive === `tab${index + 1}`}>
                        {title}
                    </MDBTabsLink>
                </MDBTabsItem>
            )
        })}
      </MDBTabs>

      <MDBTabsContent>
        {contents.map((content, index) => {
            return (
                <MDBTabsPane key={index} show={fillActive === `tab${index + 1}`}>
                  {/* render only if active */}
                  {fillActive === `tab${index + 1}` && content}
                </MDBTabsPane>
            )}
        )}
      </MDBTabsContent>
    </>
  );
}