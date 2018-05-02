#pragma strict

public class TargetInfo
{
	private var movement : TargetMovement;
	private var points : int;
	private var ids : String;
	private var prefab : GameObject;

	public function TargetInfo(move : TargetMovement, pointVal : int, obj : GameObject)
	{
		movement = move;
		points = pointVal;
		prefab = obj;
	}

	public function TargetInfo(tInfo : TargetInfo, loc : Transform)
	{
		movement = new TargetMovement(loc, tInfo.movement);
		points = tInfo.points;
		prefab = tInfo.prefab;
	}

	public function getPrefab()
	{
		return prefab;
	}
	public function getIds()
	{
		return ids;
	}
	public function getPoints()
	{
		return points;
	}
	public function getMovement()
	{
		return movement;
	}

	public function setPrefab(pref : GameObject)
	{
		prefab = pref;
	}
	public function setIds(idString : String)
	{
		ids = idString;
	}
	public function setPoints(pts : int)
	{
		points = pts;
	}
	public function setMovement(move : TargetMovement)
	{
		movement = move;
	}

}
