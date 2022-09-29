local QBCore = exports['qb-core']:GetCoreObject()

QBCore.Functions.CreateCallback('npwd:skills:getSkills', function(source, cb)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local cid = Player.PlayerData.citizenid
    local skillList = {}
    local icon
    MySQL.query('SELECT skills FROM players WHERE citizenid = ?', {cid}, function(result)
      if result and result[1] then
        local skills = json.decode(result[1].skills)
        for k, v in pairs(skills) do
          if v.Current >= 1 then
              table.insert(skillList,
                  {
                    skillname = k,
                    skilllevel = v.Current
                  }
              )
            end
        end
      end
        cb(skillList)
    end)
end)