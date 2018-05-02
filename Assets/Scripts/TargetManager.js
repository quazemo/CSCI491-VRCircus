#pragma strict
import System.Xml;
import System.Collections.Generic;

public class TargetManager
{

	private var targetDict : Dictionary.<String, TargetInfo>;
	private var targetXmlFile : TextAsset;

	public function TargetManager(spawners : Spawner[], targXml : TextAsset)
	{
		targetXmlFile = targXml;
		targetDict = new Dictionary.<String, TargetInfo>();
		var targCountDict : Dictionary.<char, int> = new Dictionary.<char, int>();
		for (var i : int = 0; i < spawners.length; i++)
		{
			targCountDict[spawners[i].id] = 0;
		}
		targetXmlFile = targXml;
		parseTargetsXml(spawners, targCountDict);
	}

	private function parseTargetsXml(spawners : Spawner[], targCountDict : Dictionary.<char, int>)
	{
		var xmlDoc : XmlDocument = new XmlDocument();
		xmlDoc.LoadXml(targetXmlFile.text);
		var targetList : XmlNodeList = xmlDoc.GetElementsByTagName("target");

		var node : XmlNode;
		var tInfo : TargetInfo;
		for (var i : int = 0; i < targetList.Count; i++)
		{
			node = targetList.Item(i);
			if (node.NodeType == XmlNodeType.Element)
			{
				parseTargetAttr(node as XmlElement, spawners, targCountDict);
			}
		}

		for (i = 0; i < spawners.length; i++)
		{
			var spawnId : char = spawners[i].id;
			if (targCountDict[spawnId] <= 0)
			{
				Debug.Log("Caution: at least one spawner has no spawnable objects.");
			}
			else
			{
				fillSpawnerList(spawners[i], targCountDict[spawnId]);
			}
		}

	}

	private function fillSpawnerList(spawner : Spawner, size : int)
	{
		var tInfoList : TargetInfo[] = new TargetInfo[size];
		//for each key with targetInfo
		var index : int = 0;
		var ids : String;
		for (var key : String in targetDict.Keys)
		{
			Debug.Log("filling " + key);
			ids = targetDict[key].getIds();
			Debug.Log("ids for target info: " + ids);
			//match spawner?
			if (ids.IndexOf(spawner.id) && index < tInfoList.length)
			{
				tInfoList[index] = targetDict[key];
				index++;
			}
		}
		spawner.setTargets(tInfoList);
	}

	private function parseTargetAttr(targetElem : XmlElement, spawners : Spawner[], targCountDict : Dictionary.<char, int>)
	{
		var name : String;
		var loc : String;
		var ids : String;
		var points : int;
		var hSpeed : float;
		var vSpeed : float;
		var prefab : GameObject;

		name = targetElem.GetAttribute("name");
		loc = targetElem.GetAttribute("loc");
		ids = targetElem.GetAttribute("spawnID");
		points = parseInt(targetElem.GetAttribute("points"));
		hSpeed = parseFloat(targetElem.GetAttribute("hSpeed"));
		vSpeed = parseFloat(targetElem.GetAttribute("vSpeed"));

		prefab = Resources.Load(loc, GameObject);

		if (prefab != null)
		{
			Debug.Log(name + " " + loc + " " + ids + " " + prefab + " h" + hSpeed + " v" + vSpeed);
		}

		var move : TargetMovement = new TargetMovement(hSpeed, vSpeed);
		var tInfo : TargetInfo = TargetInfo(move, points, prefab);
		tInfo.setIds(ids);

		targetDict[name] = tInfo;

		for (var i : int = 0; i < ids.length; i++)
		{
			if (targCountDict.ContainsKey(ids[i]))
			{
				targCountDict[ids[i]] += 1;
			}
		}
	}
}
