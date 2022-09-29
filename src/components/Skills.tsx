import React, { useEffect } from 'react';
import { Box, List, ListItem, ListItemText, LinearProgress } from '@mui/material';
import { Skills } from '../types/skills';
import fetchNui from '../utils/fetchNui';
import { ServerPromiseResp } from '@project-error/npwd-types';
import { MockSkills } from '../utils/constants';
import { isEnvBrowser } from '../utils/misc';

interface SkillListProps {
    isDarkMode: boolean;
  }

export const SkillsList: React.FC<SkillListProps> = ({ isDarkMode}) => {
    const [skills, SetSkills] = React.useState<Skills[]>([]);
    useEffect(() => {
      if (isEnvBrowser()) {
        SetSkills(MockSkills);
      }
      else {
        fetchNui<ServerPromiseResp>('npwd:skills:getSkills').then((resp) => {
          if (resp.data !== undefined) {
            SetSkills(resp.data);
          } else {
            SetSkills([]);
          }
        });
      }
    }, []);
    return (
        <List disablePadding sx={{overflow: 'auto'}}>
             {skills.map((skill) => (
                <ListItem key={skill.skillname} divider>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',width: '100%'}}>
                        <ListItemText primaryTypographyProps={{color: isDarkMode ? '#fff' : '#000', fontSize: '17px'}} primary={skill.skillname + ': Level ' + skill.skilllevel} secondary={ <LinearProgress variant="determinate" value={skill.skilllevel} />}/>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
}
export default SkillsList