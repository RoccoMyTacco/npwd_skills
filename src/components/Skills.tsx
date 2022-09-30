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
    const GetColor = (Random: string) => {
      var hash = 0;
      for (var i = 0; i < Random.length; i++) {
          hash = Random.charCodeAt(i) + ((hash << 5) - hash);
      }
      var colour = '#';
      for (var i = 0; i < 3; i++) {
          var value = (hash >> (i * 8)) & 0xFF;
          colour += ('00' + value.toString(16)).substr(-2);
      }
      return colour;
    }
    return (
        <List disablePadding sx={{overflow: 'auto'}}>
             {skills.map((skill) => (
                <ListItem key={skill.skillname} divider>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',width: '100%'}}>
                        <ListItemText primaryTypographyProps={{color: isDarkMode ? '#fff' : '#000', fontSize: '17px'}} primary={skill.skillname + ': Level ' + skill.skilllevel} secondary={ <Box sx={{ width: '100%', color: GetColor(skill.skillname)}}>
                          <LinearProgress color='inherit' variant='determinate' value={skill.skilllevel} />
                        </Box>}/>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
}
export default SkillsList