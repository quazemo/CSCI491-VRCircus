#pragma strict
import System.Xml;
import System.Collections.Generic;

public class TargetManager
{

	private var targetDict : Dictionary.<String, TargetInfo>;
	private var targetXmlFile : TextAsset;
	private var poolDict : Dictionary.<String, int>;
	private var targCountDict : Dictionary.<char, int>;

	public function TargetManager(spawners : Spawner[], targXml : TextAsset)
	{
		targetXmlFile = targXml;
		targetDict = new Dictionary.<String, TargetInfo>();
		poolDict = new Dictionary.<String, int>();

		targCountDict = new Dictionary.<char, int>();
		for (var i : int = 0; i < spawners.length; i++)
		{
			targCountDict[spawners[i].id] = 0;
		}
		parseTargetsXml(spawners);
	}

	private function parseTargetsXml(spawners : Spawner[])
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
				parseTargetAttr(node as XmlElement, spawners);
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
		var index : int = 0;
		var ids : String;
		for (var key : String in targetDict.Keys)
		{
			ids = targetDict[key].getIds();
			if (ids.IndexOf(spawner.id) > -1 && index < tInfoList.length)
			{
				tInfoList[index] = targetDict[key];
				index++;
			}
		}
		spawner.setTargets(tInfoList);
	}

	private function parseTargetAttr(targetElem : XmlElement, spawners : Spawner[])
	{
		var name : String;
		var loc : String;
		var ids : String;
		var points : int;
		var hSpeed : float;
		var vSpeed : float;
		var prefab : GameObject;
		var pool : int;

		name = targetElem.GetAttribute("name");
		loc = targetElem.GetAttribute("loc");
		ids = targetElem.GetAttribute("spawnID");
		points = parseInt(targetElem.GetAttribute("points"));
		hSpeed = parseFloat(targetElem.GetAttribute("hSpeed"));
		vSpeed = parseFloat(targetElem.GetAttribute("vSpeed"));
		pool = parseInt(targetElem.GetAttribute("pool"));

		prefab = Resources.Load(loc, GameObject);

		var move : TargetMovement = new TargetMovement(hSpeed, vSpeed);
		var tInfo : TargetInfo = TargetInfo(move, points, prefab);
		tInfo.setIds(ids);
		tInfo.setName(name);

		poolDict[name] = pool;
		targetDict[name] = tInfo;

		for (var i : int = 0; i < ids.length; i++)
		{
			if (targCountDict.ContainsKey(ids[i]))
			{
				targCountDict[ids[i]] += 1;
			}
		}
	}

	public function getSignCounts()
	{
		return new Dictionary.<String, int>(poolDict);
	}

	public function getSpawnerTargetMap()
	{
		return targetDict;
	}
}
