local QBCore = exports['qb-core']:GetCoreObject()

RegisterNUICallback("npwd:skills:getSkills", function(data, cb)
	local skills
	local p = promise.new()
	QBCore.Functions.TriggerCallback('npwd:skills:getSkills', function(Skills)
		p:resolve(Skills)
	end)
	skills = Citizen.Await(p)
	cb({ status = "ok", data = skills })
end)
