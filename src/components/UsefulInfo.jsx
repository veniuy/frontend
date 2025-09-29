import React from 'react';

const UsefulInfo = ({ event, setEvent, colors, fonts, editable }) => {
  const handleInfoChange = (e, index) => {
    const newInfo = [...event.usefulInfo];
    newInfo[index].text = e.target.value;
    setEvent({ ...event, usefulInfo: newInfo });
  };

  return (
    <div style={{ fontFamily: fonts.body, color: colors.text, padding: '20px' }}>
      <h2 style={{ fontFamily: fonts.heading, color: colors.primary }}>Información Útil</h2>
      {event.usefulInfo.map((info, index) => (
        <div key={index} style={{ marginBottom: '15px' }}>
          <h3 style={{ fontFamily: fonts.subheading, color: colors.secondary }}>{info.title}</h3>
          {editable ? (
            <textarea
              value={info.text}
              onChange={(e) => handleInfoChange(e, index)}
              style={{
                width: '100%',
                padding: '8px',
                border: `1px solid ${colors.accent}`,
                borderRadius: '4px',
                fontFamily: fonts.body,
                color: colors.text,
                backgroundColor: 'transparent'
              }}
            />
          ) : (
            <p>{info.text}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default UsefulInfo;
