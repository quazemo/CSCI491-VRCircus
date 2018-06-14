using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ExitSign : ClickableSign
{
	public override void Click(PlayerController pC)
	{
        SceneManager.LoadScene("opening");
	}

}
